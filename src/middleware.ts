import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
    
    if (req.nextUrl.pathname.startsWith("/api/get-url/")) {
        return;
    }

    if (req.nextUrl.pathname.startsWith("/_")) {
        return;
    }

    if (req.nextUrl.pathname.length === 1) {
        return;
    }

    const slug = req.nextUrl.pathname.split('/').pop();

    const data = await (await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)).json();

    if (data?.url) {
        return NextResponse.redirect(data.url)
    }
    
}