import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>HOLA MUNDO</h1>
      <Link href="/products/create">
        Crear producto
      </Link>
    </div>
  );
}
