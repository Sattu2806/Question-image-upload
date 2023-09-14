import { NextRequest, NextResponse } from "next/server"
import * as jose from "jose"
import { json } from "stream/consumers"

export default async function Middleware (request:NextRequest){
    const BearerToken = request.headers.get("Authorization") as string

    if(!BearerToken){
        return new NextResponse(JSON.stringify({
            errorMessage:"Bearertoken is not defined"
        }))
    }

    const token = BearerToken.split(" ")[1]

    if(!token){
        return new NextResponse(JSON.stringify({
            errorMessage:"token is not defined"
        }))
    }

    const signature = new TextEncoder().encode(process.env.JWT_SECRET)

    try{
        await jose.jwtVerify(token,signature)
    }catch(error){
        return new NextResponse(JSON.stringify({
            errorMessage:"Unauthorized request"
        }))
    }
}

export const config = {
    matcher:['/api/auth/me']
}