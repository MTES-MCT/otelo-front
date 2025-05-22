import { SectionAcquisition } from './_components/section-acquisition/section-acquisition'
import { SectionContact } from './_components/section-contact/section-contact'
import { SectionHero } from './_components/section-hero/section-hero'
import { SectionServices } from './_components/section-services/section-services'
import { SectionStatistics } from './_components/section-statistics/section-statistics'

export default async function AccueilPage() {
  return (
    <>
      <SectionHero />
      <SectionAcquisition />
      <SectionServices />
      <SectionStatistics />
      <SectionContact />
    </>
  )
}
