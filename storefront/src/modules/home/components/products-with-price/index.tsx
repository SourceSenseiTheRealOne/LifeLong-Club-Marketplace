import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    name: "SORI YANAGI",
    price: "€ 450.00 EUR",
    image: "https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113791/yktj9auyosxlycwhuba4.png",
  },
  {
    name: "EL CASCO",
    price: "€ 380.00 EUR",
    image: "https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113791/ytcwqa6uld8y1y0kqjgn.png",
  },
  {
    name: "SORI YANAGIE",
    price: "€ 890.00 EUR",
    image: "https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113790/cqnxufvbzo4t7qsqcfx5.png",
  },
  {
    name: "COCOTTE",
    price: "€ 450.00 EUR",
    image: "https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113790/afozov9okrqceh3wna5x.png",
  },
]

const HomeProductsWithInfo = () => {
  return (
    <section className="">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {products.map((product) => (
          <div key={product.name} className="">
            <div className="aspect-square relative border border-red-600">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-1 border border-red-600 text-let">
            <div className="ml-8 py-6">

              <h3 className="font-medium text-red-600">{product.name}</h3>
              <p className="text-sm text-red-600">{product.price}</p>
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomeProductsWithInfo