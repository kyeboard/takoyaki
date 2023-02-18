import { Flex } from "@pankod/refine-chakra-ui";

// const WorkspacesList = () => {
//     return (
//         <Flex>
//             {loading ? (
//                 <Flex
//                     width="full"
//                     height="50vh"
//                     justifyContent={"center"}
//                     alignItems="center"
//                 >
//                     <Spinner color="#2E3440" />
//                 </Flex>
//             ) : workspaces.length == 0 ? (
//                 <Flex
//                     alignItems={"center"}
//                     justifyContent="center"
//                     width="full"
//                     direction="column"
//                     height={"50vh"}
//                     gap={6}
//                 >
//                     <Image src="/images/empty.png" width={24} />
//                     <Text maxWidth={96} align="center">
//                         Your to-dos are going to be more scrambled than an egg
//                         on a trampoline if you don&apos;t arrange them in
//                         workspaces.
//                     </Text>
//                 </Flex>
//             ) : (
//                 <Flex marginTop={8} width="full" height="full">
//                     <Flex width="full" wrap="wrap" gap={5}>
//                         {workspaces.map((w) => {
//                             return (
//                                 <Box key={w.$id} maxW="400px" w="full">
//                                     <Link
//                                         href={`/project/${router.query.id}/workspace/${w.$id}`}
//                                     >
//                                         <Flex
//                                             gap={2}
//                                             direction="column"
//                                             bg={w.color}
//                                             borderRadius={"2xl"}
//                                             maxW={"400px"}
//                                             width="full"
//                                             padding={8}
//                                         >
//                                             <Box
//                                                 bg="rgba(46, 52, 64, 0.2)"
//                                                 width="fit-content"
//                                                 color="#2E3440"
//                                                 padding={3}
//                                                 borderRadius="xl"
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: icons[
//                                                         w.icon as string
//                                                     ].toSvg(),
//                                                 }}
//                                             />
//                                             <Text
//                                                 marginTop={2}
//                                                 fontSize={24}
//                                                 className={font.className}
//                                             >
//                                                 {w.title}
//                                             </Text>
//                                             <Text color="gray.600">
//                                                 {w.description}
//                                             </Text>
//                                         </Flex>
//                                     </Link>
//                                 </Box>
//                             );
//                         })}
//                     </Flex>
//                 </Flex>
//             )}
//         </Flex>
//     );
// };

// export default WorkspacesList;
