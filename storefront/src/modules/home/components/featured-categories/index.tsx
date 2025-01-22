import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"

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

const FeaturedCategories = () => {
  return (
    <section className="">
      <div className="grid grid-cols-2 items-center">
        {products.map((product) => (
          <div key={product.name} className="">
            <div className="aspect-square relative">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border py-6 w-full bg-white">
          <p className="text-red-500 text-center">
            10% DISCOUNT ON NEWSLETTER SUBSCRIPTION
          </p>
        </div>
    </section>
  )
}

export default FeaturedCategories