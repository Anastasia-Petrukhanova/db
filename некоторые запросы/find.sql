select [Room].[number], [Room].[capacity], [Room].[cost], [Hotel].[name], [Hotel].[address], [Room].[photo], string_agg(CONCAT([Extra].[name], ''), ', ')
from [Room] 
	inner join [Hotel] on [Hotel].[id] = [Room].[id_hotel]
	inner join [Room_Extra] on [Room].[id] = [Room_Extra].[id_room]
	inner join [Extra] on [Extra].[id] = [Room_Extra].[id_extra]
where [Room].[capacity] like '%%'
	and [Room].[cost] <= 100000 /*���������*/
	and [Room].[id] not in (
		select [Room].[id]
		from [Room]
			inner join [Book] on [Room].[id] = [Book].[id_room]
			inner join [History_opr] on [Book].[id] = [History_opr].[id_book]
		where 
			(([Book].[start] >= '2021-12-21'/*������*/ and [Book].[end] >= '2021-12-21'/*�����*/ and [Book].[start] <= '2021-12-21'/*�����*/)
			or ([Book].[start] <= '2021-12-21'/*������*/ and [Book].[start] <= '2021-12-21'/*�����*/ and [Book].[end] >= '2021-12-21'/*�����*/ and [Book].[end] >= '2021-12-21'/*������*/)
			or ([Book].[start] <= '2021-12-21'/*������*/ and [Book].[end] >= '2021-12-21'/*������*/ and [Book].[end] <= '2021-12-21'/*�����*/)
			or ([Book].[start] >= '2021-12-21'/*������*/ and [Book].[end] <= '2021-12-21'/*�����*/))
			and [Room].[id] not in (
				select [Room].[id]
				from [Room]
					inner join [Book] on [Room].[id] = [Book].[id_room]
					inner join [History_opr] on [Book].[id] = [History_opr].[id_book]
				where [History_opr].[status] like '������������ ��������'))
group by [Room].[number], [Room].[capacity], [Room].[cost], [Hotel].[name], [Hotel].[address], [Room].[photo]
having string_agg(CONCAT([Extra].[name], ''), ', ') like '%%'