import { collection, getDocs } from 'firebase/firestore'
import { Inter } from 'next/font/google'
import { Suspense, useState } from 'react'

import ThreeCanvas from '~/components/ThreeCanvas'
import CursoredUserInfo from '~/components/CursoredUserInfo'
import Guide from '~/components/Guide'
import Loading from '~/components/Loading'
import TopNavigation from '~/components/Navigation/TopNavigation'
import { db } from '~/firebase'
import useMouseTracker from '~/hooks/useMouseTracker'
import User from '~/types/User'

const inter = Inter({ subsets: ['latin'] })

export default function ConnectionsPage({ users }: { users: User[] }) {
  const { mousePosition } = useMouseTracker()
  const [hoverOnPanel, setHoverOnPanel] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [guideStep, setGuideStep] = useState<'description' | 'usage' | 'end'>('description')

  return (
    <main className={`${inter.className}`}>
      <div>
        <CursoredUserInfo hoverOnPanel={hoverOnPanel} mousePosition={mousePosition} />
        <div className="absolute left-0 top-0 w-screen h-screen">
          <Suspense fallback={<Loading />}>
            {guideStep === 'end' && <TopNavigation />}
            {showGuide && <Guide guideStep={guideStep} setGuideStep={setGuideStep} setShowGuide={setShowGuide} />}
            <ThreeCanvas users={users} setHoverOnPanel={setHoverOnPanel} setShowGuide={setShowGuide} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const query = await getDocs(collection(db, 'users'))
  const fetchedUsers: User[] = []
  query.forEach((doc) => {
    fetchedUsers.push({ ...(doc.data() as User), id: doc.id })
  })

  return {
    props: {
      users: fetchedUsers,
    },
  }
}
