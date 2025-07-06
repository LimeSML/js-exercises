
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Resource {
    called: string[];
    close(): void;
    [key: string]: any;
}

export function withResource(resource: Resource, processFn: (res: Resource) => void): void {
    try {
        processFn(resource);
    } finally {
        resource.close();
    }
}