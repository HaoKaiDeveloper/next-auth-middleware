import { headers, cookies } from "next/headers";

async function getUserData() {
  const headersList = headers();
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const name = decodeURIComponent(headersList.get("x-user-name") as string);
  const email = headersList.get("x-user-email");
  return { name, email, token: token?.value };
}

const Page = async () => {
  const user = await getUserData();
  return (
    <div className=" h-[100vh] flex items-center justify-center">
      <div className="text-white text-2xl w-[40%] h-auto mx-auto break-all">
        <h1 className="text-center">Middleware auth</h1>
        <p className="my-3">name : {user.name}</p>
        <p className="my-3">email : {user.email}</p>
        <p className="my-3">token : {user.token}</p>
      </div>
    </div>
  );
};

export default Page;
