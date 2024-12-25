/***************************MiddleWare***************************/
export const checkInput = function (req, res, next) {
    if (req.method != "POST")
        next();
    const userDetails = req.body;
    try {
        if (userDetails.length === 0)
            throw new Error("Empty Request");
    }
    catch (err) {
        res.status(400).json({
            status: "Failure",
            message: err
        });
    }
    next();
};
/******************FACTORY FUNCTIONS ***********************/
export const getElementById = function (ElementModel, element) {
    return async function (req, res) {
        const { elementId } = req.params.elementId;
        try {
            const Element = await ElementModel.find(elementId);
            if (!Element) {
                throw new Error(`${element} Not found`);
            }
            res.status(200).json({
                status: "Successful",
                message: Element
            });
        }
        catch (err) {
            res.status(400).json({
                status: "failure",
                message: `${element} with id: ${elementId} not found`
            });
        }
    };
};
export const deleteElementById = function (ElementModel, element) {
    return async function (req, res) {
        const { elementId } = req.params.elementId;
        try {
            const Element = await ElementModel.findByIdAndDelete(elementId);
            if (!Element) {
                throw new Error(`${element} Not found`);
            }
            res.status(200).json({
                status: "Successfully deleted",
                message: Element
            });
        }
        catch (err) {
            res.status(400).json({
                status: "failure",
                message: `${element} with id: ${elementId} not found`
            });
        }
    };
};
export const createFactory = function (ElementModel, element) {
    return async function (req, res) {
        try {
            const ElementDetails = req.body;
            const Element = ElementModel.create(ElementDetails);
            res.status(200).json({
                status: "Success",
                message: `${element} created Successfully`,
                Element
            });
        }
        catch (err) {
            res.status(500).json({
                status: "failure",
                message: err.message
            });
        }
    };
};
export const getAllFactory = function (ElementModel, element) {
    return async function (req, res) {
        try {
            const ProductDataStore = await ElementModel.find();
            if (ProductDataStore.length === 0) {
                throw new Error(`No ${element}s Found`);
            }
            res.status(200).json({
                status: "Success",
                message: ProductDataStore
            });
        }
        catch (err) {
            res.status(500).json({
                status: "failure",
                message: err.message
            });
        }
    };
};
