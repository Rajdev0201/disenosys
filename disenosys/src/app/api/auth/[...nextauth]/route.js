import NextAuth from 'next-auth';
import LinkedInProvider from 'next-auth/providers/linkedin';

const authOptions = {
  providers: [
    LinkedInProvider({
      clientId:"86mz8rwaet7akp",
      clientSecret:"WPL_AP1.LmVZLcEe0gCCOHGT.AhiX0g==",
      authorization: { params: { redirect_uri: "http://localhost:3000/" } },
      profile(profileData) {
        try {
          console.log("LinkedIn Profile Data:", profileData);
          return {
            id: profileData.id,
            name: profileData.localizedFirstName + " " + profileData.localizedLastName,
            email: profileData.emailAddress,
            image: profileData.profilePicture["displayImage~"].elements[0].identifiers[0].identifier,
          };
        } catch (error) {
          console.error("Error parsing LinkedIn profile data:", error);
          throw new Error("Profile data could not be retrieved");
        }
      }      
    }),
  ],
  pages: {
    error: '/auth/error', // Error handling page
  },
  callbacks: {
    async session({ session, token }) {
      // Add access token to the session
      session.accessToken = token.accessToken; // Store access token in session
      console.log("Session Details:", session);
      return session; // Return session
    },
    async jwt({ token, user, account }) {
      // If the user is signing in, store the access token
      if (account) {
        token.accessToken = account.access_token; // Store access token in the JWT
        console.log("JWT Details:", token);
      }
      return token; // Return token
    },
}
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
