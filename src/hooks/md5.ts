import * as crypto from 'crypto'

export const md5 = (contents: string) => {
    return crypto.createHash('md5').update(contents).digest("hex");
}
