import User from "@src/models/user";
import { connectToDB } from "@src/utils/mongodb";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks:{
    async session({ session }) {
    const sessionUser = await User.findOne({
      email:session.user.email
    })
    session.user.id = sessionUser._id.toString();
    return session
  },
  async signIn({ profile }) {
    try {
      await connectToDB();

      // if user already exists
      const userExists = await User.findOne({ email: profile.email });
      // if not create a new user and save it in the db
      if (!userExists) {
        User.create({
          email: profile.email,
          username: profile.name,
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {}
  },
  }
  
});

export { handler as GET, handler as POST };
