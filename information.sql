select [Room].[number], [Book].[start], [Book].[end], [History_opr].[status], [History_opr].[time]
from [Room]
	inner join [Book] on [Room].[id] = [Book].[id_room]
	inner join [History_opr] on [Book].[id] = [History_opr].[id_book]
where [Book].[id_client] = 1 /*менять*/