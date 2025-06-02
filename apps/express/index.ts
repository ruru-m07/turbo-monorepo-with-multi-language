import { sum, readFileInfo } from 'native'

const result = readFileInfo("/home/ruru/Projects/turbo-monorepo-with-multi-language/apps/express/package.json");
console.log(result.content);