import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"

const dropProducts = [
  { name: "Product 1", image: "https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113790/nm3eesfcfiokemnmkbrv.png" },

]

const products = [
  {
    name: "SORI YANAGI",
    price: "€ 450.00 EUR",
    image: "https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113792/fko3uewjgztkssdlarfk.png",
  },
  {
    name: "EL CASCO",
    price: "€ 380.00 EUR",
    image: "https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113791/vw6pob5huqskzdicqkq1.png",
  },

]

const DropProducts = () => {
  return (
    <section className="flex flex-row items-center justify-center">
      <div className="flex flex-col  md:flex-row">
        <div className="flex-1 justify-center items-center">
          <h2 className="text-red-500 text-4xl font-medium mb-4">
            DROP 0012
            <br />
            THE CLUB'S PICK
          </h2>
          <div className="grid grid-cols-1 items-center">
            {dropProducts.map((product, index) => (
              <Image
                key={index}
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-self-end h-[600px]">
          <Image
            src="https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113791/xw7oem7txlkro9uxumtd.png"
            alt="Velvet Sofa"
            width={500}
            height={700}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}


export default DropProducts