export interface Instruction {
    /**
     * Title of the instruction
     */
    title: string
    /**
     * Detailed description of the instruction
     */
    description: string
    /**
     * Top position of the instruction (in % relative to the image)
     */
    top: number
    /**
     * Left position of the instruction (in % relative to the image)
     */
    left: number
}
