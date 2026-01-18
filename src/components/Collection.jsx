import Image from "next/image";
import Link from "next/link";
import React from "react";

function Collection({ProductRef}) {
  const product = [
    {
      id: 1,
      category: "Sofa",
      img: "/sofas.png",
    },
    {
      id: 2,
      category: "Launge Chair",
      img: "/launge.png",
    },
    {
      id: 3,
      category: "Bed",
      img: "/bedup.png",
    },
    {
      id: 4,
      category: "Coffee Table",
      img: "/coffee.png",
    },
    {
      id: 5,
      category: "Cupboard",
      img: "/cupo.png",
    },
    {
      id: 6,
      category: "Book Shelf",
      img: "/book.png",
    },
    {
      id: 7,
      category: "Bar Stool",
      img: "/bar.png",
    },
    {
      id: 8,
      category: "Dining Table",
      img: "/dinning.png",
    },
    {
      id: 9,
      category: "Mattress",
      img: "/mato.png",
    },
    {
      id: 10,
      category: "Recliner Chair",
      img: "/reclinerchair.png",
    },
    {
      id: 11,
      category: "Shoe Racks",
      img: "/shoerackes.png",
    },
    {
      id: 12,
      category: "SofaCum Bed",
      img: "/sofakumbed.png",
    },
    {
      id: 13,
      category: "Study Table",
      img: "/studt.png",
    },
    {
      id: 14,
      category: "Tv Unit",
      img: "/tv.png",
    },
  ];
  return (
    <div ref={ProductRef} className="flex flex-wrap gap-10 justify-center items-start p-10">
      {product.map((item) => (
        <div key={item.id} className="flex flex-col items-center">
          <Link href={`/category/${item.category}`}>
            <div
              className="
        relative 
        w-[120px] h-[120px] 
        sm:w-[150px] sm:h-[150px]
        md:w-[150px] md:h-[150px]
        rounded-2xl overflow-hidden
      "
            >
              <Image
                src={item.img}
                alt={item.category}
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>
          </Link>

          <h3 className="text-center mt-2 font-semibold text-gray-600 capitalize">
            {item.category}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Collection;
