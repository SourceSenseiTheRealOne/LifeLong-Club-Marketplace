import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "CLOTHING",
    slug: "clothing",
    image: "https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113886/jacket-lifelong_xemw0q.png",
  },
  {
    name: "HIGH-TECH",
    slug: "high-tech",
    image: "https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113791/xfgq4uodik93inxagyv2.png",
  },
  {
    name: "BEAUTY",
    slug: "beauty",
    image: "https://res.cloudinary.com/dzxalfzwh/image/upload/v1736113791/z2ob0cvkyw3tqegisbib.png",
  },
]

const HomeCategoryProducts = () => {
  return (
    <section className="container mx-auto py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/category/${category.slug}`}
            className="group relative aspect-square"
          >
          
            <Image
              src={category.image}
              alt={category.name}
              width={500}
              height={500}
              className="object-cover w-full h-full py-8 px-8"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-red-500 text-3xl font-medium">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default HomeCategoryProducts
