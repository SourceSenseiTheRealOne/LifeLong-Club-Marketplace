import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import WaitlistTemplate from "@modules/waitlist/templates"

export const metadata: Metadata = {
  title: "Waitlist",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
  params: {
    countryCode: string
  }
}

export default async function WaitlistPage({ searchParams, params }: Params) {
  const { sortBy, page } = searchParams

  return (
    <WaitlistTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
