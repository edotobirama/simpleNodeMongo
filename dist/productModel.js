import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "kindly pass a name"],
        unique: [true, "Product name should be unique"],
        maxLength: [40, "Your Product name length is more than 40 characters"]
    },
    price: {
        type: Number,
        required: [true, "Kindly provide a price"],
        valiudate: {
            validator: function (value) {
                return value > 0;
            },
            message: "Price can't be negative",
        }
    },
    categories: {
        type: String,
        required: true
    },
    productImages: {
        type: String
    },
    averageRating: Number,
    discountedPrice: {
        type: Number,
        validate: {
            validator: function (value) {
                return value < this.price;
            },
            message: "Discount should be less than value"
        }
    }
});
const ProductModel = mongoose.model("ProductModel", productSchema);
export default ProductModel;
