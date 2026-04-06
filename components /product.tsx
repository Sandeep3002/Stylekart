export default function Products() {

const items = [

{
name: "Signature Suit",
price: "₹18,999",
image: "/suit.jpg"
},

{
name: "Midnight Dress",
price: "₹12,499",
image: "/dress.jpg"
},

];

return (

<div className="grid grid-cols-2 gap-10 p-10">

{items.map((item, index) => (

<div key={index} className="shadow p-5">

<img src={item.image} />

<h2 className="text-xl font-bold">

{item.name}

</h2>

<p>{item.price}</p>

<button className="bg-blue-600 text-white px-4 py-2 mt-2">

Add to Cart

</button>

</div>

))}

</div>

);

}
