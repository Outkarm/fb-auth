import { NextResponse } from "next/server";
import path from "path"
import { promises as fs } from "fs";

const configFilePath = path.resolve('./site_config.json');

async function getConfigData (filePath) {
    const fileContents = await fs.readFile(filePath, 'utf8')

    return JSON.parse(fileContents)
}

export async function GET (req) {
    try {
        const data = await getConfigData(configFilePath)
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching config data: ', error)
        
        return NextResponse.json({
            "msg": "fail"
        }, { status: 500 })
    }

}

export async function POST (req) {
    const { qa } = await req.json()
    const data = await getConfigData(configFilePath);
    data.features.qa = qa
    try {
        await fs.writeFile(configFilePath, JSON.stringify(data))
        return NextResponse.json({
            'msg': 'ok'
        })
    } catch (error) {
        console.error('Error posting config data: ', error)

        return NextResponse.json({
            'msg': 'Configuration not set'
        }, { status: "500" })
    }

}