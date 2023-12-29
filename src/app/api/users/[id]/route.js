import User from "@src/models/user"
import { connectToDB } from "@src/utils/mongodb"

export async function GET ({params}) {
    const {id} = params
    try {
        await connectToDB()
        const user = await User.findById({id})
        return new Response(JSON.stringify(user),{satus:200})
    } catch (error) {
        console.log(error)
    }
}