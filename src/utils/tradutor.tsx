export default function traduzirMensagem(mensagem: string): string {
    const traducoes: { [key: string]: string } = {
        "The img 01 field must not be greater than 2048 kilobytes.": "A imagem 1 não pode ter mais de 2MB.",
        "The img 02 field must not be greater than 2048 kilobytes.": "A imagem 2 não pode ter mais de 2MB.",
        "The img 03 field must not be greater than 2048 kilobytes.": "A imagem 3 não pode ter mais de 2MB.",
        "The descricao field must be at least 15 characters.": "A descrição deve ter pelo menos 15 caracteres.",
        "The img 01 field must be an image.": "A imagem 1 precisa ser uma imagem",
        "The img 02 field must be an image.": "A imagem 2 precisa ser uma imagem",
        "The img 03 field must be an image.": "A imagem 3 precisa ser uma imagem",
        "The img 01 field must be a file of type: jpeg, png, jpg, gif.": "A imagem precisar ser um png, jpeg, jpg ou gif",
        "The img 02 field must be a file of type: jpeg, png, jpg, gif.": "A imagem precisar ser um png, jpeg, jpg ou gif",
        "The img 03 field must be a file of type: jpeg, png, jpg, gif.": "A imagem precisar ser um png, jpeg, jpg ou gif",
        "The descricao field must not be greater than 200 characters.": "A descrição não deve ter mais de 200 caracteres.",
        "The descricao field is required.": "A descrição é obrigatória.",
        "The img 01 field is required.": "A imagem 1 é obrigatória.",
        "The img 02 field is required.": "A imagem 2 é obrigatória.",
        "The img 03 field is required.": "A imagem 3 é obrigatória.",
    };
    return traducoes[mensagem] || mensagem;
}
