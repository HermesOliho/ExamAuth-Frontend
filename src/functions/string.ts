/**
 * Transforme les premières lettres de chaque mot en majuscule
 * @param str La chaîne des caractères à transformer
 * @param separator La séparateur servant à détecter les mots
 * @param joinWithSeparator Faut-il joindre en utilisant le même séparateur ?
 * @returns
 */
export const ucwords = (
    str: string,
    separator: string = " ",
    joinWithSeparator: boolean = false
) => {
    if (!str) return str;
    const newWords: string[] = [];
    str.split(separator).forEach((word) => {
        newWords.push(`${word.charAt(0).toUpperCase()}${word.slice(1)}`);
    });
    return newWords.join(joinWithSeparator ? separator : " ");
};

/**
 * Formatte un nombre dans un format plus lisible aux humains
 * @param nbr
 * @returns {string}
 */
export const formatNumber = (nbr: number) => {
    if (nbr > -10 && nbr < 10)
        return `${Math.sign(nbr) === -1 ? "-" : ""}0${nbr}`;
    // if (nbr > -10 && nbr < 0) return Math.si
    return `${nbr}`;
};

/**
 * Formatte une date au format JJ/MM/AAAA
 * @param date La date à formater
 * @param dateText
 * @returns
 */
export const formatDate = (date: Date | string, withYear: boolean = true) => {
    if (typeof date === "string") {
        date = new Date(date);
    }
    const day = formatNumber(date.getDate());
    const month = formatNumber(date.getMonth() + 1);
    const fullYear = date.getFullYear();
    if (withYear) return `${day}/${month}/${fullYear}`;
    else return `${day}/${month}`;
};

/**
 * Formate une date au format HH:MM
 * @param date La date à formater
 * @param dateText
 * @returns
 */
export const formatTime = (date?: Date, dateText?: string) => {
    if (dateText) {
        date = new Date(dateText);
    }
    return `${date?.getHours()}:${date?.getMinutes()}}`;
};

export function isValidDate(dateString: string) {
    // Essayer de créer un objet Date à partir de la chaîne
    const date = new Date(dateString);

    // Vérifier si la date est valide
    if (date.toString() === "Invalid Date") {
        return false;
    }

    // Vérifier si la chaîne est au format ISO 8601 (UTC)
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
    return iso8601Regex.test(dateString);
}

/**
 * Formate un objet littéral à un format lisible
 * @param obj L'objet à formatter
 * @param prefix
 * @returns
 */
export const formatLiteral = (
    obj: Object,
    prefix: string = "",
    level = 1
): string => {
    let result = [];
    for (const [key, value] of Object.entries(obj)) {
        const validValue = isValidDate(value)
            ? "Le " + formatDate(value)
            : value;

        if (key !== "created_at" && key !== "updated_at") {
            const index = isNaN(parseInt(key)) ? key : parseInt(key) + 1;
            if (validValue instanceof Array) {
                // S"il s'agit d'un tableau
                result.push(
                    `${prefix}${ucwords(`${index}`, "_")} : ${formatLiteral(
                        validValue,
                        "\t"
                    )}`
                );
            } else if (validValue instanceof Object) {
                // S'il s'agit d'un objet littéral
                console.log(validValue);
                result.push("\n" + formatLiteral(validValue, "", 2));
            } else {
                result.push(
                    `${prefix}${ucwords(`${index}`, "_")} : ${validValue}`
                );
            }
        }
    }
    if (level > 1) {
        return "===" + result.join("\n---");
    }
    return result.join("\n");
};
