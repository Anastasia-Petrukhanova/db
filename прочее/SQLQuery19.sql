select [Room].[number], [Room].[capacity], [Room].[cost], [Hotel].[name], [Hotel].[address], [Room].[photo], string_agg(CONCAT([Extra].[name], ''), ', ')
from [Room] 
inner join [Hotel] on [Hotel].[id] = [Room].[id_hotel]
--inner join [Book] on [Room].[id] = [Book].[id_room]
--inner join [History_opr] on [Book].[id] = [History_opr].[id_book]
inner join [Room_Extra] on [Room].[id] = [Room_Extra].[id_room]
inner join [Extra] on [Extra].[id] = [Room_Extra].[id_extra]
--[Book],
--[History_opr]
where [Room].[capacity] like '%%'
and [Room].[cost] <= 100000 /*стоимость*/
--and [Book].[id_room] = [Room].[id]
--and [Book].[id] = [History_opr].[id_book]
and [Room].[id] not in (
select [Room].[id]
from [Room]
inner join [Book] on [Room].[id] = [Book].[id_room]
inner join [History_opr] on [Book].[id] = [History_opr].[id_book]
where 
([Book].[start] <= 'yyyy-mm-dd'/*начало*/ and [Book].[end] <= 'yyyy-mm-dd'/*конец*/ and [Book].[end] >= 'yyyy-mm-dd'/*начало*/)
or ([Book].[start] >= 'yyyy-mm-dd'/*начало*/ and [Book].[start] <= 'yyyy-mm-dd'/*конец*/ and [Book].[end] <= 'yyyy-mm-dd'/*конец*/)
or ([Book].[start] <= 'yyyy-mm-dd'/*начало*/ and [Book].[start] <= 'yyyy-mm-dd'/*конец*/ and [Book].[end] >= 'yyyy-mm-dd'/*конец*/)
and [History_opr].[status] not like 'Бронирование отменено')
group by [Room].[number], [Room].[capacity], [Room].[cost], [Hotel].[name], [Hotel].[address], [Room].[photo]
having string_agg(CONCAT([Extra].[name], ''), ', ') like '%посуда%'
and string_agg(CONCAT([Extra].[name], ''), ', ') like '%сейф%'