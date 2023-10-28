import qs from 'qs';

export default function buildQsString(obj: Record<string, unknown>): string {
    return qs.stringify(obj, { encodeValuesOnly: true })
}