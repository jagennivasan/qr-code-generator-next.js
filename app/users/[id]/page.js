import UserProfile from "@/components/UserProfile/UserProfile";

export default async function UserProfilePage({ params }) {
  const { id } = params;

  console.log(`Fetching user data for ID: ${id}`); // Debug log

  const fetchUserData = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`;
    // console.log(`Fetching URL: ${url}`); // Debug log

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user data: ${res.statusText}`);
    }

    return await res.json();
  };

  const vcardData = await fetchUserData();

  return <UserProfile vcardData={vcardData} />;
}
