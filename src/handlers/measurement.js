// USE SQL
// import prisma from "../db"
let prisma = {}

// Get all
export const getMeasurements = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true 
        }
    })

    res.json({ data: user.products })
}

//Get one
export const getOneMeasurement = async (req, res) => {
    const id = req.params.id 

    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    })

    res.json({ data: product })
}

export const createMeasurement = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })

        res.json({ data: product })
    } catch (e) {
        //not needed because all errors default to status 500 !!
        // res.status(500)
        next()
    }
}

export const updateMeasurement = async (req, res) => {
    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id 
            }
        },
        data: {
            name: req.body.name
        }
    })

    res.json({ data: updated })
}

export const deleteMeasurement = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id 
            }
        }
    })

    res.json({ data: deleted })
}