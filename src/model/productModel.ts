import mongoose from 'mongoose'

interface IProduct extends mongoose.Document {
    name: string;
    price: number;
    categories: string;
    productImages: string;
    averageRating: number;
    discountedPrice: number;
    description: string;
    stock_quantity: number;
    brand: string;
}

const productSchema = new mongoose.Schema<IProduct>({
    name:{
        type:String,
        required: [true,"kindly pass a name"],
        unique: [true,"Product name should be unique"],
        maxLength: [40,"Your Product name length is more than 40 characters"]
    },
    price:{
        type: Number,
        required: [true,"Kindly provide a price"],
        valiudate: {
            validator: function (this: IProduct, value: number): boolean {
                return value >0;
            },
            message: "Price can't be negative",
        }
    },
    categories:{
        type: String,
        required: true
    },
    productImages:{
        type:String
    },
    averageRating :Number,
    discountedPrice :{
        type: Number,
        validate:{
            validator: function(this: IProduct,value: number): boolean{
                return value < this.price;
            },
            message: "Discount should be less than value"
        }
    },
    description:{
        type: String,
        required: [true, "kindly add description"],
        maxlength: [2000, "description can't be more than 2000 chars"],
    },
    stock_quantity:{
        type: Number,
        required: [true, "kindly add stock quantity >0 "],
        validate:{
            validator:function(this: IProduct,value:number): boolean{
                return value>=0;
            },
            message:"Stock quantity can't be negative"
        }
    },
    brand:{
        type:String,
        required:[true,"Please Enter the Brand Name"]
    }
});

const ProductModel: mongoose.Model<IProduct> = mongoose.model<IProduct>("ProductModel", productSchema);

export default ProductModel