import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import Head from 'next/head'
import Link from 'next/link'
import { db } from '~/firebase'
import User from '~/types/User'

export default function ListPage({ users }: { users: User[] }) {
  return (
    <>
      <Head>
        <title>Hyperlink | Interviews List</title>
      </Head>
      <div className="m-5">
        <p>From here yon can connect with:</p>
        <ul>
          {users.map((user) => {
            return (
              <li key={user.id}>
                <Link href={user.siteUrl} target="_blank">
                  {user.order} / {user.name} / {user.sentence}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const q = query(collection(db, 'users'), orderBy('order', 'asc'))
  const querySnapshot = await getDocs(q)
  const fetchedUsers: User[] = []

  querySnapshot.forEach((doc) => {
    fetchedUsers.push({ ...(doc.data() as User), id: doc.id })
  })

  return {
    props: {
      users: fetchedUsers,
    },
  }
}
