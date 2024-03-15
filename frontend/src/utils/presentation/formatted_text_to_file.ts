export const formatted_text_to_file = (formatted_text: string) => {
    const blob = new Blob([formatted_text], { type: 'text/plain' });
    return blob;
}

export const file_to_formatted_text = async (file: Blob, contentType: string) => {
    // Blob to text
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error("Failed to convert file to text"));
            }
        };
        reader.onerror = () => {
            reject(new Error("Failed to convert file to text"));
        };
        reader.readAsText(file);
    });
}