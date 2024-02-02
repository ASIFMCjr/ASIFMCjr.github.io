import { Token, createTokens } from "shared/api"


export const login = async (email: string, password: string): Promise<Token> => createTokens(email, password)