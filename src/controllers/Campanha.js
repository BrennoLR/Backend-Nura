const knex = require('../data/index');


module.exports = {
    async allCampaigns(req, res) {
        const result = await knex('campanhas').orderBy('cam_codigo');

        return res.status(200).send(result);
    },
    async allCampaignsforname(req, res) {
        const { cam_nome } = req.params;
        const result = await knex('campanhas').where('cam_nome', 'like', '%' + cam_nome + '%').orderBy('vol_cod');
        return res.status(200).send(result);
    },
    async allCampaignsforcod(req, res) {
        const { cam_codigo } = req.params;
        const result = await knex('campanhas').where('cam_codigo', '=', cam_codigo).orderBy('cam_codigo');
        return res.status(200).send(result);
    },

    async createCampaigns(req, res) {
        const { cam_nome } = req.body;
        const { cam_desc } = req.body;
        const { cam_img } = req.body;
        const { cam_data_in } = req.body;
        const { cam_data_fi } = req.body;
       
        if (!cam_nome || !cam_data_in || !cam_data_fi) {
            return res.status(400).send
            (
                "Os campos Nome, Data de Inicio e Data de Termino são obrigatórios!"
            );
        }
  
        if (new Date(cam_data_in) > new Date(cam_data_fi)) {
            return res.status(400).send
            (
                "A data de início não pode ser posterior à data de fim da campanha!"
            );
        }

        try {
            await knex('campanhas').insert({
                "cam_nome": cam_nome,
                "cam_desc": cam_desc,
                "cam_img": cam_img,
                "cam_data_in": cam_data_in,
                "cam_data_fi": cam_data_fi,
            });
            return res.status(201).send("Campanha criada com sucesso!");
        } catch (error) {
            console.error("Erro ao criar campanha:", error);
            return res.status(500).send("Erro interno do servidor ao criar campanha.");
        }
    },

    async updateCampaigns(req, res) {
        const { cam_codigo } = req.params;
        const { cam_nome } = req.body;
        const { cam_desc } = req.body;
        const { cam_data_in } = req.body;
        const { cam_data_fi } = req.body;

        if (!cam_nome && !cam_desc && !cam_data_in && !cam_data_fi) {
            return res.status(400).send(
                "Pelo menos um campo: Nome, Descrição, Data de Inicio, Data de Final, deve ser fornecido para atualização."
            );
        }
        const updateData = {};
        if (cam_nome) updateData.cam_nome = cam_nome;
        if (cam_desc) updateData.cam_desc = cam_desc;
        if (cam_data_in) updateData.cam_data_in = cam_data_in;
        if (cam_data_fi) updateData.cam_data_fi = cam_data_fi;
        if (cam_data_in && cam_data_fi && new Date(cam_data_in) > new Date(cam_data_fi)) {
            return res.status(400).send
            (
                "A data de início não pode ser posterior à data de fim da campanha!"
            );
        }
        try {
            const alterarCamp = await knex('campanhas')
                .where({ cam_codigo })
                .update(updateData);

            if (alterarCamp === 0) {
                return res.status(404).send("Campanha não encontrada ou nenhum dado foi alterado.");
            }

            return res.status(200).send("Campanha atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar campanha:", error);
            return res.status(500).send("Erro interno do servidor ao atualizar campanha.");
        }
    },

    async deleteCampaigns(req, res) {
        const { cam_codigo } = req.params;

        try {
            const deletarCod = await knex('campanhas')
                .where({ cam_codigo })
                .del();

            if (deletarCod === 0) {
                return res.status(404).send("Campanha não encontrada.");
            }

            return res.status(200).send("Campanha deletada com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar campanha:", error);
            return res.status(500).send("Erro interno do servidor ao deletar campanha.");
        }
    },
}