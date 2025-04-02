import React from "react";
import { Link } from "react-router-dom";
import logoIndianFood from "../Components/Images/360_F_469998410_dS3rIFPywmpTDYYr7VY6wd1SlV6c7Fa7.webp";
import logoDonatorsWorld from "../Components/Images/360_F_469998410_dS3rIFPywmpTDYYr7VY6wd1SlV6c7Fa7.webp";
import logoKFC from "../Components/Images/360_F_700484707_STl5CADexXsrdy6fsXxG9d9koQPr8Lfc.webp";
import logoTexasChicken from "../Components/Images/360_F_747360721_GFQezZsLhZNBHLNISaOplwV29r7GSv0d.webp";
import logoBurgerKing from "../Components/Images/image6.webp";
import logoShaurma from "../Components/Images/pexels-diva-plavalaguna-6150432.jpg";                                 
const communities = [
  { name: "Indian food donators", logo: logoIndianFood  },
  { name: "Donators world", logo: logoDonatorsWorld  },
  { name: "KFC West London", logo: logoKFC },
  { name: "Texas Chicken", logo: logoTexasChicken },
  { name: "Burger King", logo: logoBurgerKing },
  { name: "Shaurma 1", logo: logoShaurma },
];

const Communities = () => {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Communities in Zero spoil
      </h2>
      <div className="flex flex-wrap justify-center gap-5">
        {communities.map((community, index) => (
          <Link to="/communities" key={index}>
            <div className="w-36 md:w-48 bg-white rounded-lg shadow-lg p-3 text-center cursor-pointer hover:shadow-xl transition">
              <img
                src={community.logo}
                alt={community.name}
                className="w-full h-20 object-contain"
              />
              <p className="mt-2 text-sm font-semibold">{community.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Communities;
