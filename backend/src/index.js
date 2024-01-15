import app from "./app.js";
import "dotenv/config.js";
import { connectToDB } from "./db/index.js";
import { Review } from "./models/review.models.js";


const feedbackData = [
  { stars: 4, comment: "I had an excellent experience with their service. The team was responsive and addressed my queries promptly. The product quality is commendable, and I'm very satisfied with my purchase!" },
  { stars: 2, comment: "Unfortunately, the product didn't meet my expectations in terms of quality. I encountered some issues with it, and the customer support was not as helpful as I had hoped." },
  { stars: 5, comment: "I was pleasantly surprised by the speed of shipping and the meticulous packaging. The product itself exceeded my expectations. I highly recommend their services!" },
  { stars: 3, comment: "My overall experience was average. There are areas where improvement is needed, particularly in terms of communication and delivery time. The product itself is decent but not outstanding." },
  { stars: 5, comment: "This company provides exceptional products and services. I am a repeat customer, and each time, they have delivered high-quality items. I am extremely satisfied and will continue to recommend them to others." },
  { stars: 1, comment: "I had a terrible experience with this company. The service was subpar, and I faced several issues with the product. I won't be making any future purchases from them." },
  { stars: 4, comment: "I found their products to be of good value for money. The pricing is reasonable, and the quality is satisfactory. I appreciate the variety of options available." },
  { stars: 3, comment: "The product itself is decent, but the delivery took longer than expected. I would appreciate more transparency regarding shipping times. Customer service was responsive but could improve." },
  { stars: 5, comment: "The customer support team went above and beyond to assist me. Their dedication to customer satisfaction is truly outstanding. I will definitely be a loyal customer in the future." },
  { stars: 2, comment: "I was disappointed with my purchase. The product didn't meet my expectations, and the overall experience left much to be desired. I won't be recommending this company to others." },
];

const user1 = "6597b54fd1c21fa99708c2b1"
const user2 = "6597b5ed2015d958ab9c1bcc"
const user3 = "6597b632a8eeb3a0c8bfbc24"
const user4 = "65981510596eef2603310a1c"

const product1 = "659d55594d57012b1a57c029"
const product2 = "659d537cbd3f7f8a465f1ebe"
const product3 = "659f6ebbf8f425396f7f4ee7"
const product4 = "659f6f78f8f425396f7f4eed"

const reviewData = feedbackData.map((data, index)=>{
  let customerId, productId
  if (index < 3){
    customerId = user1
  } else if (index < 5){
    customerId = user2
  } else if (index < 7){
    customerId = user3
  } else if (index < 10){
    customerId = user4
  }
  
  productId = product1
  if (index===7){
    productId = product2
  } else if (index===8){
    productId = product3
  } else if (index===9){
    productId = product4
  }

  return {
    ...data,
    productId,
    customerId
  }
})


connectToDB()
.then(() => {
    app.get("/", (req, res) => {
      res.send("Welcome to the e-commerce website");
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`The app is listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection to Mongodb failed ::", error);
  });
