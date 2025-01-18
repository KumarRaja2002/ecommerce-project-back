"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProducts = void 0;
const db_1 = require("./lib/db"); // Import the db connection from dbConnection.ts
const product_1 = require("./schemas/product"); // Ensure you have the schema file set up correctly
const data = [
    {
        name: "Wide Bowknot Hat",
        price: 288,
        about: "This is a wide bowknot hat",
        quantity: 10,
        rating: 3,
        available: true,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-cap.png",
    },
    {
        name: "Plain Round Neck T-shirt",
        price: 395,
        about: "This is a plain round neck t-shirt",
        quantity: 20,
        rating: 4,
        available: true,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-fit-t-shirt.png"
    },
    {
        name: "Cotton Hoodie",
        price: 498,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-hoodie.png",
        rating: 4, // Converted rating to integer
        about: "A soft cotton hoodie for warm comfort during chilly weather.",
        quantity: 100,
        available: true
    },
    {
        name: "Men's Waistcoat",
        price: 2500,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-jacket.png",
        rating: 4, // Converted rating to integer
        about: "A men's waistcoat that adds a sharp touch to formal attire.",
        quantity: 100,
        available: true
    },
    {
        name: "Slim Fit Jeans",
        price: 1469,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-jeans-pants.png",
        rating: 3, // Converted rating to integer
        about: "Slim fit jeans designed for a trendy, modern look.",
        quantity: 100,
        available: true
    },
    {
        name: "Miss Chase Bodycon Dress",
        price: 974,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-modren-net.png",
        rating: 4, // Converted rating to integer
        about: "A stylish bodycon dress that fits the figure perfectly for any occasion.",
        quantity: 100,
        available: true
    },
    {
        name: "Zari Design Kurta",
        price: 1869,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-punjabi.png",
        rating: 4, // Converted rating to integer
        about: "A traditional kurta with intricate zari design for a festive look.",
        quantity: 100,
        available: true
    },
    {
        name: "Slim Fit Blazer",
        price: 2599,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-purple-jacket.png",
        rating: 4, // Converted rating to integer
        about: "A sleek and stylish slim fit blazer for formal occasions.",
        quantity: 100,
        available: true
    },
    {
        name: "Animal Printed Shirt",
        price: 1017,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-short-sleeves-shirt.png",
        rating: 4, // Converted rating to integer
        about: "A bold animal print shirt that makes a statement.",
        quantity: 100,
        available: true
    },
    {
        name: "Polyester Saree",
        price: 419,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-side-sareee.png",
        rating: 4, // Converted rating to integer
        about: "A beautiful polyester saree with a smooth and shiny texture.",
        quantity: 100,
        available: true
    },
    {
        name: "Warm Up Jacket",
        price: 2796,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-sim-jacket.png",
        rating: 4, // Converted rating to integer
        about: "A cozy warm-up jacket perfect for winter weather.",
        quantity: 100,
        available: true
    },
    {
        name: "Wrap Dress",
        price: 3039,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-simple-formal.png",
        rating: 3, // Converted rating to integer
        about: "An elegant wrap dress that suits all body types.",
        quantity: 100,
        available: true
    },
    {
        name: "Knit Cream Sweater",
        price: 996,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-stylish-sweater.png",
        rating: 3, // Converted rating to integer
        about: "A soft and warm cream sweater for cozy days.",
        quantity: 100,
        available: true
    },
    {
        name: "Sheer Anarkali",
        price: 2172,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/clothes-white-punjabi.png",
        rating: 3, // Converted rating to integer
        about: "A sheer Anarkali dress with a graceful design.",
        quantity: 100,
        available: true
    },
    {
        name: "Embellished Maxi Dress",
        price: 1799,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/cloths-blue-fork.png",
        rating: 3, // Converted rating to integer
        about: "A stunning maxi dress with beautiful embellishments.",
        quantity: 100,
        available: true
    },
    {
        name: "Embroidered Net Gown",
        price: 62990,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/cloths-long-fork.png",
        rating: 3, // Converted rating to integer
        about: "An elegant embroidered gown with intricate net detailing.",
        quantity: 100,
        available: true
    },
    {
        name: "Analog Men's Watch",
        price: 1850,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-casual-watch.png",
        rating: 4, // Converted rating to integer
        about: "A classic analog men's watch perfect for any occasion.",
        quantity: 100,
        available: true
    },
    {
        name: "Tea Kettle Pot",
        price: 1685,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-copper-kettle.png",
        rating: 4, // Converted rating to integer
        about: "A stylish copper tea kettle pot for tea lovers.",
        quantity: 100,
        available: true
    },
    {
        name: "Aluminium 4 Cup Tea Kettle",
        price: 399,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-kettle.png",
        rating: 4, // Converted rating to integer
        about: "A practical 4-cup aluminium tea kettle for your kitchen.",
        quantity: 100,
        available: true
    },
    {
        name: "Tripod Stand",
        price: 390,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-medium-tripod.png",
        rating: 4, // Converted rating to integer
        about: "A reliable tripod stand for cameras and phones.",
        quantity: 100,
        available: true
    },
    {
        name: "Beard Trimmer",
        price: 398,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-nova-trimmer.png",
        rating: 5, // Converted rating to integer
        about: "A precision beard trimmer for a clean, sharp look.",
        quantity: 100,
        available: true
    },
    {
        name: "Nova SuperGroom Multi-kit",
        price: 1199,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-nover-v2-trimmer.png",
        rating: 4, // Converted rating to integer
        about: "A multi-purpose grooming kit with various attachments.",
        quantity: 100,
        available: true
    },
    {
        name: "Privateer Quartz Watch",
        price: 8122,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-black-watch.png",
        rating: 4, // Converted rating to integer
        about: "A luxurious quartz watch with a classic design.",
        quantity: 100,
        available: true
    },
    {
        name: "Chronograph black Watch",
        price: 6395,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-royal-watch.png",
        rating: 4, // Converted rating to integer
        about: "A black chronograph watch with a sleek, modern look.",
        quantity: 100,
        available: true
    },
    {
        name: "Collider Black Dial Men's Watch",
        price: 14995,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-belt-watch.png",
        rating: 4, // Converted rating to integer
        about: "A luxury men's watch with a black dial and metal band.",
        quantity: 100,
        available: true
    },
    {
        name: "Neutra Analog Men's Watch",
        price: 10995,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-watch.png",
        rating: 4, // Converted rating to integer
        about: "A stylish analog watch for daily wear.",
        quantity: 100,
        available: true
    },
    {
        name: "Maritime Men's Watch",
        price: 11999,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-tatar-watch.png",
        rating: 4, // Converted rating to integer
        about: "A premium maritime-themed men's watch.",
        quantity: 100,
        available: true
    },
    {
        name: "Handheld Full Body Massager",
        price: 1299,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/appliances-body-massager.png",
        rating: 4, // Converted rating to integer
        about: "A handheld body massager for relaxation and relief.",
        quantity: 100,
        available: true
    },
    {
        name: "True Wireless Earbuds",
        price: 1899,
        image_url: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-body-sound.png",
        rating: 4, // Converted rating to integer
        about: "True wireless earbuds with superior sound quality.",
        quantity: 100,
        available: true
    }
];
class seedProducts {
    insertProducts(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check the database connection before proceeding
                console.log("Checking database connection...");
                const isConnected = yield db_1.db.select().from(product_1.products).limit(1); // Example check to ensure connection works
                if (!isConnected) {
                    return c.json({ message: 'Database connection failed' }, 500);
                }
                console.log("Inserting data into the database...");
                yield db_1.db.insert(product_1.products).values(data); // This is where insertion happens
                console.log("Data inserted successfully!");
                return c.json({ message: 'Products inserted successfully!', insertedProducts: data });
            }
            catch (error) {
                console.error('Error inserting products:', error);
                return c.json({ message: 'An error occurred while inserting products', error: error.message }, 500);
            }
        });
    }
}
exports.seedProducts = seedProducts;
