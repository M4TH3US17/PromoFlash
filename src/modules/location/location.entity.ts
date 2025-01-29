import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "locations"})
export class LocationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    latitude: number;

    @Column()
    longitude: number;
};