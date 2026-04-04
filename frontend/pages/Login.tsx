// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Layout from "@/components/Layout";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log("Login attempt:", { email, password });
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-md">
//           {/* Card */}
//           <div className="bg-secondary rounded border border-border p-8">
//             {/* Header */}
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
//               <p className="text-muted-foreground">
//                 Sign in to your RefreshMart account
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Email Field */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <input
//                     id="email"
//                     type="email"
//                     placeholder="demo@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="•••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-10 pr-10 py-2 border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between text-sm">
//                 <Link
//                   to="#"
//                   className="text-primary hover:opacity-80 transition-opacity font-medium"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-primary text-primary-foreground py-2 rounded font-medium hover:opacity-90 transition-opacity"
//               >
//                 Sign In
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="my-6 flex items-center gap-4">
//               <div className="flex-1 border-t border-border"></div>
//               <span className="text-sm text-muted-foreground">OR</span>
//               <div className="flex-1 border-t border-border"></div>
//             </div>

//             {/* Social Login */}
//             <div className="space-y-3 mb-6">
//               <button className="w-full border border-border text-foreground py-2 rounded font-medium hover:bg-border transition-colors flex items-center justify-center gap-2">
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.461,2.268,15.365,1,12.545,1 C6.777,1,2,5.777,2,11.545c0,5.768,4.777,10.545,10.545,10.545c6.045,0,10.545-4.5,10.545-10.545 C23.09,11.406,23.031,10.821,22.945,10.239z" />
//                 </svg>
//                 Continue with Google
//               </button>
//             </div>

//             {/* Sign Up Link */}
//             <p className="text-center text-sm text-muted-foreground">
//               Don't have an account?{" "}
//               <Link
//                 to="/register"
//                 className="text-primary hover:opacity-80 transition-opacity font-medium">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }
import { setUser } from "../utils/auth";

export default function Login() {

  const login = () => {

    setUser({
      name: "Demo User",
      email: "demo@gmail.com",
      phone: "942320422",
      location: "",
      bio: ""
    });

    window.location.href="/account";
  };

  return (

    <div className="p-10">

      <h2 className="text-2xl mb-4">Login</h2>

      <button
        onClick={login}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Demo Login 
      </button>

    </div>
  );
}