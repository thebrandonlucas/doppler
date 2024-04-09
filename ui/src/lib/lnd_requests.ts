import type { NodeRequests } from "./nodes";

export interface LndRequests {
    base_url: string;
    header: HeadersInit;
    tls: string;
    new(base_url: string, macaroon: string, tls: any): void;
}

export class LndRequests implements LndRequests, NodeRequests {
    base_url: string;
    header: HeadersInit;
    tls: string;
    proxy: string;

    constructor(base_url: string, macaroon: string, tls: string) {
        this.base_url = base_url;
        this.header = {
            'Grpc-Metadata-macaroon': macaroon,
        };
        this.tls = tls;
        this.proxy = '/api/proxy';
    }
    //API docs: https://lightning.engineering/api-docs/api/lnd/index.html

    async fetchChannels(): Promise<any> {
        let url = `${this.base_url}/v1/channels`
        let headers = { ...this.header, 'target': url };
        const response = await fetch(this.proxy, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async fetchInfo(): Promise<any> {
        let url = `${this.base_url}/v1/getinfo`
        let headers = { ...this.header, 'target': url };
        const response = await fetch(this.proxy, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async fetchBalance(): Promise<any> {
        let url = `${this.base_url}/v1/balance/blockchain`
        let headers = { ...this.header, 'target': url };
        const response = await fetch(this.proxy, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async fetchSpecificNodeInfo(pubkey: String): Promise<any> {
        let url = `${this.base_url}/v1/graph/node/${pubkey}`
        let headers = { ...this.header, 'target': url };
        const response = await fetch(this.proxy, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
};