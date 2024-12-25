 /***************************MiddleWare***************************/

 export const checkInput =function (req: any,res :any,next : any){
    if(req.method!="POST") next()
    const userDetails = req.body
    try{
        if(userDetails.length===0)
            throw new Error("Empty Request")

    }
    catch(err){
        res.status(400).json({
            status: "Failure",
            message: err
        })
    }
    next()

}

 /******************FACTORY FUNCTIONS ***********************/
 export const getElementById = function(ElementModel: any, element: string){
    return async function (req : any,res:any){
        const {elementId} = req.params.elementId
        
        try{
            const Element = await ElementModel.find(elementId)
            if(!Element){
                throw new Error(`${element} Not found`);
            }
            res.status(200).json({
                status : "Successful",
                message : Element
            })
        }
        catch(err: any){
            res.status(400).json({
                status : "failure",
                message : `${element} with id: ${elementId} not found`
            })
        }
    }
}

export const deleteElementById = function (ElementModel: any, element: string){
    return async function (req : any,res:any){
        const {elementId} = req.params.elementId
        
        try{
            const Element = await ElementModel.findByIdAndDelete(elementId)
            if(!Element){
                throw new Error(`${element} Not found`);
            }
            res.status(200).json({
                status : "Successfully deleted",
                message : Element
            })
        }
        catch(err: any){
            res.status(400).json({
                status : "failure",
                message : `${element} with id: ${elementId} not found`
            })
        }
    }
}

export const createFactory = function (ElementModel: any,element:string){
    return async function(req : any,res:any){
        try{
            const ElementDetails = req.body;
            const Element = ElementModel.create(ElementDetails)
            res.status(200).json({
                status : "Success",
                message : `${element} created Successfully`,
                Element
            })
        }
        catch(err: any){
            res.status(500).json({
                status : "failure",
                message : err.message
            })
        }
    }
}

export const getAllFactory = function (ElementModel: any,element:string){
    return async function (req : any,res:any){
        try{

            let query = req.query
            let selectQuery =query.select
            let sortQuery =query.sort;

            let queryResProm = ElementModel.find()
            
            if(sortQuery){
                let order = sortQuery.split(' ')[1];
                let sortParam = sortQuery.split(' ')[0];
                if(order=="inc"){
                    queryResProm = queryResProm.sort(sortParam)
                }
                else{
                    queryResProm = queryResProm.sort(-sortParam)
                }
            }
            if(selectQuery){
                queryResProm = queryResProm.select(selectQuery)
            }

            const result  = await queryResProm
            if(result.length===0){
                     throw new Error(`No ${element}s Found`);
            }
            res.status(200).json({
                message: result,
                status: "success"
            })
        }catch(err :any){
            res.status(400).json({
                message:err.message,
                status:"failure"
            })
        }


        //     const ProductDataStore = await ElementModel.find()
        //     if(ProductDataStore.length===0){
        //         throw new Error(`No ${element}s Found`);
        //     }
        //     res.status(200).json({
        //         status : "Success",
        //         message : ProductDataStore
        //     })
        // }
        // catch(err: any){
        //     res.status(500).json({
        //         status : "failure",
        //         message : err.message
        //     })
        // }
    }
}