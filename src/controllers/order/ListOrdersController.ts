import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/ListOrdersService';

class ListOrdersController {

    async handle(req: Request, res: Response) {
        const { order_id, product_id, amount } = req.body

        const listOrdersService = new ListOrdersService();

        const order = await listOrdersService.execute();

        return res.json(order);
    }

}

export { ListOrdersController }