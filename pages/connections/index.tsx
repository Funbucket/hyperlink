import { RoundedBox } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { collection, getDocs } from 'firebase/firestore'
import { Inter } from 'next/font/google'
import { Suspense, useState } from 'react'
import { DoubleSide } from 'three'

import { Controls, ImagePanels, Lights } from '~/components/Canvas'
import CursoredUserInfo from '~/components/CursoredUserInfo'
import Loading from '~/components/Loading'
import { db } from '~/firebase'
import useMouseTracker from '~/hooks/useMouseTracker'
import User from '~/types/User'

const inter = Inter({ subsets: ['latin'] })

export default function ConnectionsPage({ users }: { users: User[] }) {
  const { mousePosition } = useMouseTracker()
  const [hoverOnPanel, setHoverOnPanel] = useState(false)

  return (
    <main className={`${inter.className}`}>
      <div>
        {/* <TopNavigation /> */}
        <CursoredUserInfo hoverOnPanel={hoverOnPanel} mousePosition={mousePosition} />
        <div className="absolute left-0 top-0 w-screen h-screen">
          <Suspense fallback={<Loading />}>
            <Canvas>
              <Lights />
              <ImagePanels users={users} setHoverOnPanel={setHoverOnPanel} />
              <Controls />
              <RoundedBox args={[1000, 1000, 1000]} radius={100}>
                <meshLambertMaterial attach="material" side={DoubleSide} color={'#5373E2'} />
              </RoundedBox>
            </Canvas>
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
