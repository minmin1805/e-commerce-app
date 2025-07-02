import React, { useEffect } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

function Navbar() {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart, total, getAllCartItems } = useCartStore();

  function handleLogout() {
    logout();
  }

  useEffect(() => {
    getAllCartItems();
  }, []);

  return (
    <header
      style={{
        background:
          "linear-gradient(135deg, var(--warm-beige) 0%, var(--soft-peach) 100%)",
      }}
      className="fixed top-0 left-0 w-full shadow-lg transition-all duration-300 border-b z-50"
    >
      <div className="container mx-auto py-8">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            style={{ color: "var(--deep-burnt-orange)" }}
            className="text-4xl font-bold "
          >
            CozyCommerce
          </Link>

          <div className="flex flex-row items-center gap-4">
            <Link
              to={"/"}
              style={{ color: "var(--gentle-brown)" }}
              className="text-2xl transition duration-300 font-medium
					 ease-in-out"
            >
              Home
            </Link>
            <p
              style={{ color: "var(--gentle-brown)" }}
              className="text-2xl transition duration-300 font-medium
					 ease-in-out"
            >
              Categories
            </p>
            <p
              style={{ color: "var(--gentle-brown)" }}
              className="text-2xl transition duration-300 font-medium
					 ease-in-out"
            >
              Featured
            </p>
            <p
              style={{ color: "var(--gentle-brown)" }}
              className="text-2xl transition duration-300 font-medium
					 ease-in-out"
            >
              About
            </p>
            <p
              style={{ color: "var(--gentle-brown)" }}
              className="text-2xl transition duration-300 font-medium
					 ease-in-out"
            >
              Contact
            </p>
          </div>

          <div className="flex flex-row items-center gap-4">
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-gray-300 hover:text-amber-800 transition duration-300 
							ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-amber-800 text-amber-800"
                  size={35}
                />
                <span className="hidden sm:inline text-amber-800">Cart</span>

                <span
                  className="absolute -top-2 -left-2 bg-amber-800 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-amber-900 transition duration-300 ease-in-out"
                >
                  {cart.length || 0}
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link
                style={{background: "var(--muted-coral)"}}
                className=" text-white py-3 px-6 bg-amber-800 hover:bg-amber-900
									rounded-md flex items-center transition duration-300"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className=" text-white py-3 px-6 bg-amber-800 hover:bg-amber-900
						rounded-md flex items-center transition duration-300"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  style={{background: "var(--muted-coral)"}}
                  className=" text-white py-5 px-8 
									rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  style={{background: "var(--shadow)"}}
                  className=" text-amber-850 py-5 px-8 
									rounded-md flex items-center transition duration-300"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
