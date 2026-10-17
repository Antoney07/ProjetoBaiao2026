import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { ProductCategories } from "./ProductCategories"
import { ProductSituations } from "./ProductSituations"

@Entity("products")
export class Products {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @ManyToOne(() => ProductSituations, (productSituation) => productSituation.products)
    @JoinColumn({ name: "productSituationId" })
    productSituation!: ProductSituations;

    @ManyToOne(() => ProductCategories, (productCategory) => productCategory.products)  
    @JoinColumn({ name: "productCategoryId" })
    productCategory!: ProductCategories;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}