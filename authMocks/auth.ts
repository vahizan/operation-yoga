const NAMock = {
  auth: {
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.AUTH_SECRET,
    },
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(),
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
};

export const {
  auth,
  useSession,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NAMock;
