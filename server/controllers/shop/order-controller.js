
const paypal = require('../../helpers/paypal')
const Order = require('../../models/Order')

const createOrder = async (req, res) => {
    try {

        const { userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            payementId,
            payerId, } = req.body;


            const create_payment_json = {
                intent : 'sale',
                payer : {
                    payment_method : 'paypal'
                },
                redirect_urls : {
                    return_url : 'http://localhost:5173/shop/paypal-retrun',
                    cancel_url : 'http://localhost:5173/shop/paypal-cancel'
                },
                transaction : [{
                    item_list : {
                        items : cartItems.map(item=>({
                            name : item.title,
                            sku : item.productId,
                            price : item.price.toFixed(2),
                            currency : 'USD',
                            quantity : item.quantity
                        }))
                    },
                    amount : {
                        currency : 'USD',
                        total : totalAmount.toFixed(2)
                    },
                    description : 'description'
            }]
    };

    paypal.payment.create(create_payment_json, async(error,paymentInfo)=>{
        if(error){
            console.log(error)

            return res.status(500).json({
                success: false,
                message : 'Error While creating paypal payment'
            })
        }else {
            const newlyCreatedOrder = new Order({
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            payementId,
            payerId,
            })
            await newlyCreatedOrder.save();

            const approvalURL = paymentInfo.links.find(link=> link.rel === 'approval_url').href;

            res.status(201).json({
                success: true,
                approvalURL,
                orderId : newlyCreatedOrder._id
            })
        }
    })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
}

const capturePayment = async (req, res) => {
    try {

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
}

module.exports = { createOrder, capturePayment };