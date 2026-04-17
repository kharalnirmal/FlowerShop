import { AnimatedNavFramer } from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <AnimatedNavFramer />
      <main className="mx-auto px-4 pt-24 container">
        <section className="items-center gap-8 grid md:grid-cols-2 min-h-[85vh]">
          <div>
            <h1 className="font-bold text-4xl md:text-left text-center">
              Navigation with Framer Motion
            </h1>
            <p className="mt-4 text-muted-foreground md:text-left text-center">
              Scroll down to see the magic. Click the collapsed circle to expand
              the navigation.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80"
            alt="Blooming flowers in sunlight"
            className="shadow rounded-xl w-full h-80 object-cover"
          />
        </section>

        <section className="gap-6 grid md:grid-cols-2 bg-muted p-8 rounded-lg h-[160vh]">
          <div>
            <h2 className="font-bold text-2xl">Page Content</h2>
            <p className="mt-4">
              This animation is powered by Framer Motion, providing a fluid,
              physics-based feel while preserving a clean interactive shell.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1400&q=80"
            alt="Field of flowers"
            className="self-start shadow rounded-xl w-full h-80 object-cover"
          />
        </section>
      </main>
    </>
  );
}
