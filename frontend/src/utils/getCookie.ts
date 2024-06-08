export const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") {
    console.error("Cannot access document object in this environment");
    return undefined;
  }

  const value: string = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const lastPart: string | undefined = parts.pop();
    if (lastPart !== undefined) {
      return lastPart.split(";").shift();
    }
  }

  return undefined;
};
