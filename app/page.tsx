import { Button } from "@/components/client/Button";
import { CardLayout } from "@/components/server/Card";
import { LogIn, UserRound } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-cover" style={{ backgroundImage: "url('/images/bg.jpg')" }}>
      <CardLayout className="flex flex-col gap-y-5 items-center py-40 rounded-xl">
        <section className="w-fit text-center px-10 space-y-2">
          <h1 className="text-title text-4xl">Quiz App</h1>
          <p className="sm:w-[400px] text-description">Website ini adalah platform dinamis yang dirancang untuk membuat, mengelola, dan mengikuti kuis secara efisien</p>
        </section>
        <section className="flex gap-x-3">
          <Button title="Login" icon={<LogIn size={20} />} />
          <Button title="Register" icon={<UserRound size={20} />} />
        </section>
      </CardLayout>
    </div >
  );
}
