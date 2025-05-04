const express = require("express")
const mongoose = require("mongoose")
const Product = require("./productModel")


const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8000



const MONGODB_URL = "mongodb+srv://dsamdave:dsamdave@cluster0.ud4yxkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("MongoDb Connected...")
    app.listen(PORT, ()=>{
        console.log(`Server running on ${PORT}`)
    })
})



const drugs = [

    { id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120, manufacturer: "Pfizer" },
   
    { id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200, manufacturer: "GSK" },
   
    { id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150, manufacturer: "Bayer" },
   
    { id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80, manufacturer: "Sanofi" },
   
    { id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70, manufacturer: "Pfizer" },
   
    { id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160, manufacturer: "Novartis" },
   
    { id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140, manufacturer: "Teva" },
   
    { id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60, manufacturer: "Roche" },
   
    { id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 300, isPrescriptionOnly: false, stock: 180, manufacturer: "Bayer" },
   
    { id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 20, isPrescriptionOnly: true, stock: 90, manufacturer: "AstraZeneca" },
   
    { id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 250, isPrescriptionOnly: true, stock: 50, manufacturer: "Pfizer" },
   
    { id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110, manufacturer: "Novartis" },
   
    { id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30, manufacturer: "Novo Nordisk" },
   
    { id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50, manufacturer: "GSK" },
   
    { id: 15, name: "Codeine", category: "Analgesic", dosageMg: 30, isPrescriptionOnly: true, stock: 20, manufacturer: "Teva" },
   
    { id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 300, manufacturer: "Nature’s Bounty" },
   
    { id: 17, name: "Ranitidine", category: "Antacid", dosageMg: 150, isPrescriptionOnly: false, stock: 90, manufacturer: "Sanofi" },
   
    { id: 18, name: "Doxycycline", category: "Antibiotic", dosageMg: 100, isPrescriptionOnly: true, stock: 40, manufacturer: "Pfizer" },
   
    { id: 19, name: "Tramadol", category: "Analgesic", dosageMg: 50, isPrescriptionOnly: true, stock: 45, manufacturer: "Teva" },
   
    { id: 20, name: "Folic Acid", category: "Supplement", dosageMg: 5, isPrescriptionOnly: false, stock: 250, manufacturer: "Nature’s Bounty" }
   
   ];



app.get("/", (req, res)=>{

    res.json({message: "Welcome to CareerEx Server!"})
})


// app.get("/drugs/antibiotics", (req, res)=>{

//     const antibiotics = drugs.filter((each)=>{
//         return each.category == "Antibiotic"
//     })

//     res.json(antibiotics)

// })

// app.get("/drugs/names", (req, res)=>{
//     const drugNames = drugs.map((each)=>{
//         return each.name.toLowerCase()
//     })

//     res.json(drugNames)

// })

// app.post("/drugs/by-category", (req, res)=>{
//     // const category = req.body.category

//     const { category } = req.body

//     if(!category){
//         return res.json({mesage: "Please enter a category..."})
//     }

//     const drugCategorized = drugs.filter((each)=>{
//         return each.category == category
//     })

//     res.json(drugCategorized)
// })

// app.get("/drugs/names-manufacturers", (req, res)=>{
//   const drugNamesAndManufactures = drugs.map((each)=>{
//     return {
//         drugName: each.name,
//         manufacturer: each.manufacturer
//     }
//   })

//   res.json(drugNamesAndManufactures)
// })

// app.get("/drugs/prescription", (req, res)=>{
//     const prescribedDrug = drugs.filter((each)=>{
//         return each.isPrescriptionOnly == true // false
//     })

//     res.json(prescribedDrug)
// })


// app.post("/drugs/manufacturer-count", (req, res)=>{

//     const { manufacturer } = req.body

//     if(!manufacturer){
//         return res.status(400).json({message: "Please add a manufacture"})
//     }

//     const manufacturerCount = drugs.filter((each)=>{
//         return each.manufacturer == manufacturer
//     })

//     res.status(200).json({
//         message: "success",
//         count: manufacturerCount.length, 
//         manufacturerCount
//     })
// })

// aysnc  asynchronous      a synchronous
// await

// C R U D


app.get("/all-product", async (req, res)=>{

    const allProducts =  await Product.find()

    res.status(200).json({
        message: "Succcess",
        allProducts
    })

})



app.post("/create-product", async (req, res)=>{

    const { inStock, name, price, image, quantity  } = req.body

    if(!name || !price){
        return res.status(400).json({message: "Please enter all fields."})
    }

    const newProduct = new Product({ name, price, image, quantity, inStock })

    await newProduct.save()

    res.status(201).json({
        message: "Success",
        newProduct
    })
})

app.get("/one-product/:id", async (req, res)=>{

    const { id } = req.params

    const product = await Product.findById(id)

    if(!product){
        return res.status(404).json({message: "Product not found."})
    }

    res.status(200).json({
        message: "Success",
        product
    })

})

app.put("/edit-product/:id", async (req, res)=>{

    const { id } = req.params

    const { inStock, name, price, image, quantity } = req.body

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { inStock, name, price, image, quantity },
        {new: true}
    )


    res.status(201).json({
        message: "Succcess",
        updatedProduct
    })

})


app.patch("/update-product/:id", async (req, res)=>{

    const { id } = req.params

    const { name } = req.body

    const existingProduct = await Product.findById(id)

    if(existingProduct){
        existingProduct.name = name

        await existingProduct.save()

        return res.status(200).json({
            message: "Success",
            existingProduct
        })
    } else {
        res.status(404).json({ message: "Product not found" })
    }
})

app.delete("/delete-product", async (req, res)=>{

    const { id } = req.body

    const deletedProduct = await Product.findByIdAndDelete(id)

    res.status(200).json({message: "Success"})
})