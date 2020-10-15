<template>
    <div class="v-container pa-4">
        <v-layout class="text-center" column="column">
            <v-flex xs12="xs12" md10="md10">
                <div>
                    <p v-if="allSubPrice > 0" class="headline text--primary">
                        Суммарно вы тратите на подписки {{ allSubPrice }}₽ ежемесячно. При текущих
                        подписках вы потратите {{ allSubPrice*12 }}₽ за
                        год.
                    </p>
                    <p v-else class="headline text--primary">Похоже вы еще не ведете учет подписок!</p>
                </div>
                <v-row>
                    <v-col cols="12" sm="4" v-for="sub in subs" :key="sub.name">
                        <v-card class="mx-auto" min-width="344" min-height="180">
                            <v-card-text class="text-center">
                                <p class="display-1 text--primary">
                                    {{ sub.name }}
                                </p>
                                <p class="headline text--primary">{{ sub.price }}₽/мес.</p>
                                <div class="text--primary">
                                    Вы тратите {{ sub.price*12 }}₽ в год.
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <v-card class="mx-auto" min-width="344" min-height="180">
                            <v-card-text>
                                <v-btn class="align-center" fab large color="primary" @click.stop="dialog = true">
                                    <v-icon dark>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" max-width="400">
            <v-card>
                <v-card-title class="headline text-center">Добавление подписки</v-card-title>

                <v-card-text class="subtitle-1">
                    <v-text-field v-model="subName" label="Название подписки" required></v-text-field>
                    <v-text-field v-model="subPrice" label="Стоимость попдиски" required></v-text-field>

                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="primary" outlined @click="newSub">Добавить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                dialog: false,
                subName: "",
                subPrice: 0,
            }
        },
        computed: {
            ...mapState(["subs", "allSubPrice"]),
        },
        methods: {
            ...mapActions(["addSub"]),
            newSub() {
                if (this.subName !== "" && this.subPrice > 0) {
                    let name = this.subName;
                    let price = this.subPrice;
                    this.addSub({name, price});
                }
                this.subName = "";
                this.subPrice = 0;
                this.dialog = false;
            }
        }
    }
</script>

<style scoped>
    .align-center {
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>
